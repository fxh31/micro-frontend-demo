/**
 * 用于定义与子应用的通讯
 * initGlobalState
 */
import { initGlobalState } from 'qiankun';
// 创建全局状体
export const actions = initGlobalState({
  user: 'qiankun',
});