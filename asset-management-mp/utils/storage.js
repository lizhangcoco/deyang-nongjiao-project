// utils/storage.js - 本地存储封装(模拟后端数据库)
const PREFIX = 'cdnee_asset_';

function get(key, defaultValue = null) {
  try {
    const v = wx.getStorageSync(PREFIX + key);
    return v === '' || v === undefined ? defaultValue : v;
  } catch (e) {
    return defaultValue;
  }
}

function set(key, value) {
  try {
    wx.setStorageSync(PREFIX + key, value);
    return true;
  } catch (e) {
    return false;
  }
}

function remove(key) {
  try {
    wx.removeStorageSync(PREFIX + key);
    return true;
  } catch (e) {
    return false;
  }
}

// 生成全局唯一ID
function genId() {
  return 'id_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
}

// 生成业务编号
function genBizNo(prefix) {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  const rand = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${prefix}${ymd}${rand}`;
}

// 生成资产编号(规则:归口码-年份-流水)
function genAssetCode(manageDept, year) {
  const deptCode = {
    comprehensive: 'ZH', digital_center: 'SZ', strategy: 'ZF',
    finance: 'CW', business_dept: 'YW'
  }[manageDept] || 'QT';
  const seq = get('asset_seq_' + year, 0) + 1;
  set('asset_seq_' + year, seq);
  return `${deptCode}-${year}-${String(seq).padStart(5, '0')}`;
}

// 列表查询通用方法
function query(key, filters = {}) {
  const list = get(key, []);
  return list.filter(item => {
    return Object.keys(filters).every(k => {
      const f = filters[k];
      if (Array.isArray(f)) return f.includes(item[k]);
      return item[k] === f;
    });
  });
}

// 新增记录
function insert(key, item) {
  const list = get(key, []);
  item.id = item.id || genId();
  item.created_at = item.created_at || new Date().toISOString();
  item.updated_at = new Date().toISOString();
  list.unshift(item);
  set(key, list);
  return item;
}

// 更新记录
function update(key, id, updates) {
  const list = get(key, []);
  const idx = list.findIndex(i => i.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], ...updates, updated_at: new Date().toISOString() };
  set(key, list);
  return list[idx];
}

// 删除记录
function del(key, id) {
  const list = get(key, []);
  const filtered = list.filter(i => i.id !== id);
  set(key, filtered);
  return list.length !== filtered.length;
}

module.exports = {
  get, set, remove,
  genId, genBizNo, genAssetCode,
  query, insert, update, del
};
