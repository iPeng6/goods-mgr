const formatStringToCamelCase = (str) => {
  const splitted = str.split('-');
  if (splitted.length === 1) return splitted[0];
  return (
    splitted[0] +
    splitted
      .slice(1)
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join('')
  );
};

const getStyleObjectFromString = (str) => {
  const style = {};
  str.split(';').forEach((el) => {
    const [property, value] = el.split(':');
    if (!property) return;

    const formattedProperty = formatStringToCamelCase(property.trim());
    style[formattedProperty] = (value || '').trim();
  });

  return style;
};

module.exports = (source) => {
  // 处理图片相对路径改成动态require
  let replaced = source.replace(/\!\[(.*)\]\((.+)\)/g, (match, p1, p2) => {
    // console.log('=====', p2);
    if (!p2.startsWith('http')) {
      return `<NextImage alt="${p1}" src={require('${
        p2.startsWith('.') ? p2 : './' + p2
      }').default} />`;
    }
    return match;
  });

  // 将html的style 转换成jsx style object
  replaced = replaced.replace(/style="(.+)"/g, (match, p1) => {
    const res = `style={${JSON.stringify(getStyleObjectFromString(p1))}}`;
    return res;
  });
  return replaced;
};
