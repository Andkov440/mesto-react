import '../index.css';
import logo from '../img/logo.svg';

export default function Header() {
  return (
  <header className="header">
    <img className="header__image" src={logo} alt="Лого" />
  </header>
  );
}