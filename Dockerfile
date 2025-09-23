# 第一阶段: 使用 Node.js 作为基础镜像
FROM node:22 AS builder

# 设置工作目录
WORKDIR /app

# 设置软件源
RUN npm config set registry https://mirrors.cloud.tencent.com/npm/ && \
    yarn config set registry https://mirrors.cloud.tencent.com/npm/


COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# 下载最新版本 Chrome Info
RUN apt update && apt install -y wget && \
    wget -O latestChromeData.json https://cnb.cool/flyinbug/ChromeDownloadlinksGet/-/git/raw/main/chrome_data.json

# 第二阶段：运行
FROM node:22-alpine

WORKDIR /app
RUN mkdir -p /app/ExternalData

COPY ExternalData /app/ExternalData

COPY --from=builder /app/.output /app/main
COPY --from=builder /app/latestChromeData.json /app/ExternalData/latestChromeData.json

ENV NODE_ENV=production
ENV HOST=0.0.0.0

EXPOSE 3000

CMD ["node", "main/server/index.mjs"]