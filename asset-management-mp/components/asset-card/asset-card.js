// components/asset-card/asset-card.js
Component({
  properties: {
    asset: {
      type: Object,
      value: {}
    },
    showStatus: {
      type: Boolean,
      value: true
    }
  },
  methods: {
    onTap() {
      this.triggerEvent('tap', { asset: this.data.asset });
    }
  }
});
