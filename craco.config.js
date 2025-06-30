module.exports = {
  devServer: (devServerConfig) => {
    devServerConfig.client = {
      overlay: false, // ✅ Tắt overlay lỗi runtime
    };
    return devServerConfig;
  },
};
