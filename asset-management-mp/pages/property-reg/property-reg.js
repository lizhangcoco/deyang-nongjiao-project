// pages/property-reg/property-reg.js
const { propertyRegApi } = require('../../utils/api.js');
const { PROPERTY_REG_TYPE, findLabel } = require('../../utils/enum.js');

Page({
  data: {
    list: [],
    overdueList: [],
    regTypeOptions: PROPERTY_REG_TYPE
  },
  onShow() {
    const list = propertyRegApi.list().map(i => ({
      ...i,
      reg_type_label: findLabel(PROPERTY_REG_TYPE, i.registration_type)
    }));
    const overdueList = propertyRegApi.overdueList();
    this.setData({ list, overdueList });
  },
  onRegister(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '办理产权登记',
      content: '推送至国资监管平台备案，由国资委核发产权登记证',
      success: (r) => {
        if (r.confirm) {
          const filingNo = '川国资产权〔2026〕' + String(Math.floor(Math.random() * 1000)).padStart(3, '0') + '号';
          propertyRegApi.register(id, filingNo);
          this.onShow();
          wx.showToast({ title: '已登记', icon: 'success' });
        }
      }
    });
  }
});
