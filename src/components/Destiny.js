import {
  // useNavigate,
  Link
} from 'react-router-dom';
import { linkCSS } from './Button';

export default function Destiny() {
  // const navigate = useNavigate();

  return (
    <div>
      <h1>Destiny Page</h1>

      {/*
        🐛 React Router does not support go back using <Link />
        https://stackoverflow.com/questions/72676015/react-router-go-back-using-link
      */}
      {/* <button onClick={() => navigate(-1)} css={linkCSS}>
        Go Back
      </button> */}
      <br />
      <Link to="/" css={linkCSS}>
        Go Home
      </Link>
    </div>
  );
}
