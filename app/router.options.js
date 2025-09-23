const customRoutes = [
    {
        path: '/',
        name: 'ip',
        component: () => import('@/pages/index.vue'),
    },
    {
        // 关于页面
        path: '/about',
        name: 'about',
        component: () => import('@/pages/about.vue'),
    },
    {
        path: '/gh',
        name: 'githubCDN',
        component: () => import('@/pages/networkTool/githubCDN.vue'),
    },
    {
        path: '/processIMG',
        name: 'processImage',
        component: () => import('@/pages/graphicsTool/processImage.vue'),
    },
    {
        path: '/displayHDR',
        name: 'displayHDR',
        component: () => import('@/pages/graphicsTool/displayHDR.vue'),
    },
    {
        path: '/textBase64',
        name: 'textBase64',
        component: () => import('@/pages/characterTool/textBase64.vue'),
    },
    {
        path: '/statisticsChars',
        name: 'statisticsChars',
        component: () => import('@/pages/characterTool/statisticAlpha.vue'),
    },
    {
        // 简体字、繁体字 互相转换
        path: '/zhConvertTradSimp',
        name: 'zhConvertTradSimp',
        component: () => import('@/pages/characterTool/zhConvertTradSimp.vue'),
    },
    {
        // 为所欲为成语接龙
        path: '/unrestrainedChain',
        name: 'unrestrainedChain',
        component: ()=> import('@/pages/characterTool/unrestrainedChain.vue'),
    },
    {
        // Emoji合成
        path: '/emojiMix',
        name: 'emojiMix',
        component: ()=> import('@/pages/characterTool/emojiMix.vue'),
    },
    {
        path: '/randomNumber',
        name: 'randomNumber',
        component: () => import('@/pages/characterTool/randomNumber.vue'),
    },
    {
        path: '/calculateTheDate',
        name: 'calculateTheDate',
        component: () => import('@/pages/dateTool/calculateTheDate.vue'),
    },
    {
        path: '/chineseCalendar',
        name: 'chineseCalendar',
        component: () => import('@/pages/dateTool/chineseCalendar.vue'),
    },
    {
        // Markdown在线渲染
        path: '/mdv',
        name: 'markdownView',
        component: () => import('@/pages/characterTool/markdownView.vue'),
    },
    {
        // 生成强密码
        path: '/generatePWD',
        name: 'complexPassword',
        component: () => import('@/pages/characterTool/complexPassword.vue'),
    },
    {
        // MC服务器检测
        path: '/mcstatus',
        name: 'mcStatus',
        component: () => import('@/pages/networkTool/mcStatus.vue'),
    },
    /** 工具类，前台不显示 */
    {
        path: '/oneindexM',
        name: 'oneindexM',
        component: () => import('@/pages/other/oneIndex.vue'),
    },
    {
        path: '/curl',
        name: 'curl',
        component: () => import('@/pages/other/curl.vue'),
    },
    {
        path: '/urlMusic',
        name: 'urlMusic',
        component: () => import('@/pages/characterTool/urlMusic.vue'),
    },
    {
        path: '/autoBing',
        name: 'autoBing',
        component: ()=> import('@/pages/networkTool/autoBingSearch.vue')
    },
    {
        path: '/qCloud/qCloudEdgeOneTokenMaker',
        name: 'qCloudEdgeOneTokenMaker',
        component: () => import('@/pages/networkTool/qCloud/qCloudEdgeOneTokenMaker.vue')
    },
    {
        path: '/CrossPlatformChrome',
        name: 'CrossPlatformChrome',
        component: () => import('@/pages/networkTool/CrossPlatformChrome.vue')
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/components/error404.vue'),
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/404',
    },
];
export default {
    routes: (_routes) => [..._routes, ...customRoutes],
};
