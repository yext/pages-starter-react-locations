async function importFresh(devserver, modulePath) {
  const cacheBustingModulePath = `${modulePath}?update=${Date.now()}`;
  return await devserver.ssrLoadModule(
    cacheBustingModulePath
  );
}
export {
  importFresh
};
