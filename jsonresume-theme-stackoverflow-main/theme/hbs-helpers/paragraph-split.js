const paragraphSplit = (text) => {
  const expr = /\r\n|\r|\n/g;

  const lines = text.split(expr);
  const output = lines.filter(line => line).map(l => `<p>${l}</p>`).join('');
  return output;
};

export { paragraphSplit };
