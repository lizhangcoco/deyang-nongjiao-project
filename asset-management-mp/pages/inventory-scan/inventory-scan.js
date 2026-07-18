// pages/inventory-scan/inventory-scan.js
const { inventoryApi, assetApi } = require('../../utils/api.js');
const storage = require('../../utils/storage.js');

Page({
  data: {
    inv: null,
    scannedList: [],
    notScannedAssets: []
  },
  onLoad(options) {
    if (options.invId) {
      this.loadInv(options.invId);
    }
  },
  loadInv(invId) {
    const list = storage.get('inventories', []);
    const inv = list.find(i => i.id === invId);
    if (!inv) return;
    const scannedIds = (inv.scanned_assets || []).map(s => s.asset_id);
    const allAssets = assetApi.list();
    const notScanned = allAssets.filter(a => !scannedIds.includes(a.id) && a.status !== 'scrapped');
    this.setData({
      inv,
      scannedList: inv.scanned_assets || [],
      notScannedAssets: notScanned
    });
  },

  onScan() {
    wx.scanCode({
      success: (res) => {
        const code = res.result;
        const asset = assetApi.getByCode(code);
        if (!asset) {
          // 盘盈:台账无但有实物
          wx.showModal({
            title: '盘盈',
            content: `编号${code}不在台账中,标记为盘盈`,
            success: (r) => {
              if (r.confirm) {
                inventoryApi.scan(this.data.inv.id, 'surplus_' + code, 'surplus');
                this.loadInv(this.data.inv.id);
              }
            }
          });
          return;
        }
        inventoryApi.scan(this.data.inv.id, asset.id, null);
        wx.showToast({ title: '已盘点：' + asset.asset_name, icon: 'success' });
        this.loadInv(this.data.inv.id);
      }
    });
  },

  onMarkShortage(e) {
    const assetId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '盘亏',
      content: '确认该资产盘亏？',
      success: (r) => {
        if (r.confirm) {
          inventoryApi.scan(this.data.inv.id, assetId, 'shortage');
          this.loadInv(this.data.inv.id);
        }
      }
    });
  },

  onMarkDamage(e) {
    const assetId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '毁损',
      content: '确认该资产毁损？',
      success: (r) => {
        if (r.confirm) {
          inventoryApi.scan(this.data.inv.id, assetId, 'damage');
          this.loadInv(this.data.inv.id);
        }
      }
    });
  },

  onComplete() {
    wx.showModal({
      title: '盘点完成',
      content: '将进入差异处理流程：使用部门说明 → 归口+财务意见 → 公司领导审批 → 损失核销+台账调整+财务调账',
      showCancel: false,
      success: () => wx.navigateBack()
    });
  }
});
