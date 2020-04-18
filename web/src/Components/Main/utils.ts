const getDefaultValues = () => {
  const isMobile = window.innerWidth < 650;
  const width = isMobile ? 100 : 250;
  const height = isMobile ? Math.round(window.innerHeight * 0.14) : 200;
  const size = isMobile ? 5 : 4;
  const startDensity = 0.3;

  return {width, height, size, startDensity};
};

export { getDefaultValues };
