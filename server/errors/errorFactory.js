function errorFactory(err, CRUDType, status = 500) {
  const errObj = { status };
  switch (CRUDType) {
    case this.LIST:
      return {
        ...errObj,
        log: err,
        msg: { err: 'There was a problem listing resources' }
      };
    case this.CREATE:
      return {
        ...errObj,
        log: err,
        msg: { err: 'There was a problem creating resource' }
      };
    case this.READ:
      return {
        ...errObj,
        log: err,
        msg: { err: 'There was a problem reading resource' }
      };
    case this.UPDATE:
      return {
        ...errObj,
        log: err,
        msg: { err: 'There was a problem updating resource' }
      };
    case this.DESTROY:
      return {
        ...errObj,
        log: err,
        msg: { err: 'There was a problem destroying resource' }
      };
    default:
      return {};
  }
}

errorFactory.LIST = 'LIST';
errorFactory.CREATE = 'CREATE';
errorFactory.READ = 'READ';
errorFactory.UPDATE = 'UPDATE';
errorFactory.DESTROY = 'DESTROY';

module.exports = errorFactory;
