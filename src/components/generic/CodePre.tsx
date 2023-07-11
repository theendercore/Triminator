type CodePreProps = { children?: string; className?: string };
export default function CodePre({ children, className }: CodePreProps) {
  return (
    <pre
      class={`bg-neutral-800 p-2 x-1 rounded-lg text-neutral-500 ${className}`}
    >
      {children}
    </pre>
  );
}
