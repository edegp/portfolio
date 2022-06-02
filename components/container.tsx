export default function Container({ children, ...other }) {
  return (
    <div id="container" {...other}>
      {children}
    </div>
  );
}
