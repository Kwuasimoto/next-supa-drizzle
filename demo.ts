class QueryClient {
  internalQuery: string = "";

  readonly select = () => {
    this.internalQuery = "SELECT * FROM TABLE ";
    return this;
  };

  readonly where = (variable: string) => {
    this.internalQuery = this.internalQuery + `WHERE ID == ${variable}`;
    return this;
  };

  private readonly sanitizeVariables = () => {
    // Complex function runs over the input values and sanitizes them before execute
    this.internalQuery = JSON.stringify(this.internalQuery);

    // Execute selectWhere query
    // ....

    return {
      /** Some Data */
    };
  };
}

const queryClient = new QueryClient();

const result = queryClient.select().where("0; DELETE ALL THE DATA");
