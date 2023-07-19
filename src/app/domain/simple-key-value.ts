export class SimpleKeyValue{
  key: string;
  value: string;
  constructor(key, value){
    this.key = key ?? '';
    this.value = value ?? '';
  }
}
