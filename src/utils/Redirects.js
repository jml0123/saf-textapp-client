export default function handleSuccess(path) {
  const { location, history } = this.props;
  const destination = (location.state || {}).from || `/${path}`;
  history.push(destination);
}
