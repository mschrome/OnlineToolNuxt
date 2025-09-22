/**
 * 基于 Fetch API 的 HTTP 客户端工具类
 * 替代 axios，提供完整的 RESTful API 支持
 */
class HttpClient {
  constructor(baseURL = '', options = {}) {
    this.baseURL = baseURL;
    this.timeout = options.timeout || 10000;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...options.headers
    };
    
    // 请求和响应拦截器
    this.requestInterceptors = [];
    this.responseInterceptors = [];
  }

  /**
   * 添加请求拦截器
   */
  addRequestInterceptor(interceptor) {
    this.requestInterceptors.push(interceptor);
  }

  /**
   * 添加响应拦截器
   */
  addResponseInterceptor(onFulfilled, onRejected) {
    this.responseInterceptors.push({ onFulfilled, onRejected });
  }

  /**
   * 设置默认请求头
   */
  setDefaultHeaders(headers) {
    this.defaultHeaders = { ...this.defaultHeaders, ...headers };
  }

  /**
   * 构建完整的 URL
   */
  buildURL(url) {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    const cleanBaseURL = this.baseURL.replace(/\/$/, '');
    const cleanUrl = url.startsWith('/') ? url : '/' + url;
    return cleanBaseURL + cleanUrl;
  }

  /**
   * 构建请求配置
   */
  async buildConfig(config = {}) {
    const { headers = {}, ...restConfig } = config;
    
    let finalConfig = {
      headers: { ...this.defaultHeaders, ...headers },
      ...restConfig,
    };

    // 执行请求拦截器
    for (const interceptor of this.requestInterceptors) {
      finalConfig = await interceptor(finalConfig) || finalConfig;
    }

    return finalConfig;
  }

  /**
   * 处理响应数据
   */
  async handleResponse(response) {
    // 执行响应拦截器
    let processedResponse = response;
    for (const { onFulfilled, onRejected } of this.responseInterceptors) {
      try {
        if (response.ok && onFulfilled) {
          processedResponse = await onFulfilled(processedResponse) || processedResponse;
        } else if (!response.ok && onRejected) {
          processedResponse = await onRejected(processedResponse) || processedResponse;
        }
      } catch (error) {
        throw error;
      }
    }

    if (!processedResponse.ok) {
      const errorData = {
        status: processedResponse.status,
        statusText: processedResponse.statusText,
        url: processedResponse.url
      };

      // 尝试获取错误响应体
      try {
        const contentType = processedResponse.headers.get('content-type');
        if (contentType?.includes('application/json')) {
          errorData.data = await processedResponse.json();
        } else {
          errorData.data = await processedResponse.text();
        }
      } catch (e) {
        // 忽略解析错误
      }

      throw new HttpError(`HTTP ${errorData.status}: ${errorData.statusText}`, errorData);
    }
    
    const contentType = processedResponse.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      return await processedResponse.json();
    }
    
    return await processedResponse.text();
  }

  /**
   * 带超时控制的 fetch 请求
   */
  async fetchWithTimeout(url, config) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new HttpError(`请求超时 (${this.timeout}ms)`, { 
          type: 'timeout', 
          timeout: this.timeout 
        });
      }
      throw new HttpError(`网络请求失败: ${error.message}`, { 
        type: 'network', 
        originalError: error 
      });
    }
  }

  /**
   * 通用请求方法
   */
  async request(method, url, data = null, config = {}) {
    const fullURL = this.buildURL(url);
    const requestConfig = await this.buildConfig({
      ...config,
      method: method.toUpperCase(),
      body: data ? (typeof data === 'string' ? data : JSON.stringify(data)) : null,
    });

    try {
      const response = await this.fetchWithTimeout(fullURL, requestConfig);
      return await this.handleResponse(response);
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      throw new HttpError(`${method.toUpperCase()} 请求失败: ${error.message}`, {
        method,
        url: fullURL,
        originalError: error
      });
    }
  }

  /**
   * GET 请求
   */
  async get(url, params = null, config = {}) {
    let fullUrl = url;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          searchParams.append(key, params[key]);
        }
      });
      fullUrl += (url.includes('?') ? '&' : '?') + searchParams.toString();
    }
    return this.request('GET', fullUrl, null, config);
  }

  /**
   * POST 请求
   */
  async post(url, data = null, config = {}) {
    return this.request('POST', url, data, config);
  }

  /**
   * PUT 请求
   */
  async put(url, data = null, config = {}) {
    return this.request('PUT', url, data, config);
  }

  /**
   * DELETE 请求
   */
  async delete(url, config = {}) {
    return this.request('DELETE', url, null, config);
  }

  /**
   * PATCH 请求
   */
  async patch(url, data = null, config = {}) {
    return this.request('PATCH', url, data, config);
  }
}

/**
 * 自定义 HTTP 错误类
 */
class HttpError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'HttpError';
    this.details = details;
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError);
    }
  }
}

// 创建默认实例，保持与原有代码的兼容性
const instance = new HttpClient('/api_v1', { timeout: 10000 });

// 添加响应拦截器，保持原有的业务逻辑
instance.addResponseInterceptor(
  async function (response) {
    // 检查响应是否成功
    if (!response.ok) {
      return response; // 让 handleResponse 处理错误
    }
    
    // 克隆响应以避免消耗原始流
    const clonedResponse = response.clone();
    
    try {
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        const data = await clonedResponse.json();
        
        // 后台响应失败或者未知返回
        if (typeof data.flag === 'undefined' || data.flag === false) {
          // 创建一个错误响应
          const errorResponse = new Response(
            JSON.stringify({ data, status: response.status }), 
            {
              status: 400,
              statusText: 'Business Logic Error',
              headers: response.headers
            }
          );
          return errorResponse;
        }
      }
    } catch (e) {
      // 如果解析失败，返回原始响应
      console.warn('响应拦截器解析失败:', e);
    }
    
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

// 导出兼容原有 API 的函数
export function get(url, params) {
  return instance.get(url, params).catch((e) => {
    console.log("请求获取数据失败");
    return Promise.reject(e);
  });
}

export function post(url, data) {
  return instance.post(url, data).catch((e) => {
    console.log("请求获取数据失败");
    return Promise.reject(e);
  });
}

export function del(url) {
  return instance.delete(url).catch((e) => {
    console.log("请求获取数据失败");
    console.log(e);
  });
}

export function put(url, data) {
  return instance.put(url, data).catch((e) => {
    console.log("请求获取数据失败");
    console.log(e);
  });
}

// 导出类和实例，提供更多灵活性
export default instance;
export { HttpClient, HttpError };