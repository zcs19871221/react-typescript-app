class Base {
  getNumber() {
    throw new Error('fsdfsdfd')
  }
}
class Sub extends Base {
  override getNumber() {
    throw new Error('fsdfsdfd')
  }
}