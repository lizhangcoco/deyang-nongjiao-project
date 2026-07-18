// components/status-tag/status-tag.js
const { findLabel, findColor } = require('../../utils/enum.js');

Component({
  properties: {
    status: { type: String, value: '' }
  },
  data: {
    label: '',
    color: 'default'
  },
  observers: {
    'status': function(val) {
      this.setData({
        label: findLabel([
          { value: 'pending_inbound', label: '待入库', color: 'default' },
          { value: 'in_use', label: '在用', color: 'success' },
          { value: 'idle', label: '闲置', color: 'warning' },
          { value: 'under_repair', label: '维修中', color: 'info' },
          { value: 'transferring', label: '调拨中', color: 'info' },
          { value: 'pending_scrap', label: '待报废', color: 'warning' },
          { value: 'scrapped', label: '已报废', color: 'danger' },
          { value: 'leased_out', label: '对外出租', color: 'info' },
          { value: 'transferred_out', label: '对外转让', color: 'info' },
          { value: 'inventory_diff', label: '盘点差异', color: 'danger' }
        ], val),
        color: findColor(val)
      });
    }
  }
});
