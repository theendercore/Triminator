type ErrorProps = {
  type?: string;
  url?: string;
  default?: boolean;
};

export default function Error({ type }: ErrorProps) {
  return (
    <div>
      <h1>Error {type}</h1>
      <a href="/">home</a>
    </div>
  );
}
