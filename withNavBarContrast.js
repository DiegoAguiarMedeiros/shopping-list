const { withAndroidStyles } = require('@expo/config-plugins');

function withNavBarContrast(config) {
  return withAndroidStyles(config, (config) => {
    const appTheme = config.modResults.resources.style.find(
      (s) => s.$.name === 'AppTheme'
    );
    if (appTheme) {
      appTheme.item.push({
        _: 'false',
        $: { name: 'android:enforceNavigationBarContrast' },
      });
    }
    return config;
  });
}

module.exports = withNavBarContrast;