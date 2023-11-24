const baseURL = process.env.BASE_URL || "http://localhost:5678";

export const customInstance = async <T>({
  url,
  method,
  headers,
  params,
  data,
}: {
  url: string;
  method: "get" | "post" | "put" | "delete" | "patch";
  headers?: any;
  params?: any;
  data?: BodyType<unknown>;
  responseType?: string;
}): Promise<T> => {
  const response = await fetch(
    `${baseURL}${url}` + new URLSearchParams(params),
    {
      method,
      ...(data ? { body: JSON.stringify(data) } : {}),
      headers,
    }
  );

  return response.json();
};

export default customInstance;

export type BodyType<BodyData> = BodyData;
