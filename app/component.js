
export default (text = 'Hello World') => {
  const elem = document.createElement('div');
  elem.innerHTML = '<h1>'+text+'</h1>';
  return elem;
};
