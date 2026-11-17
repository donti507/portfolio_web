import { Link } from 'react-router-dom';

export default function NotFound() {
  return <section className="space-y-5">
    <h1>This page isn't in the notebook</h1>
    <p className="flex gap-5"><Link to="/">Home</Link><Link to="/projects">Projects</Link></p>
  </section>;
}
