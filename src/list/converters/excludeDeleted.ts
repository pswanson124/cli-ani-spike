export class excludeDeletedValueConverter {
  toView(list) {
    return list.filter( field => !field.deleted );
  }
}
