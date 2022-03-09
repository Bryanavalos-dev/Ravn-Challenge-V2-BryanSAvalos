export class ResponseListDTO<T, C, P, L> {
  count: C;
  data: T[];
  page: P;
  limit: L;

  constructor(data: T[], count: C, page = 1, limit = 1) {
    this.count = count;
    let index = page * limit - limit + 1;
    this.data = data.map((d) => {
      return {
        index: index++,
        ...d,
      };
    });
  }
}

export class ResponseSingleDTO<T> {
  data: T;

  constructor(data: T) {
    this.data = data;
  }
}

export class ResponseMinimalDTO {
  id?: string;
  ids?: string[];
  message?: string;
}
