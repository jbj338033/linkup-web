import * as S from "./style";

const Header = () => {
  return (
    <S.Container>
      <S.Nav>
        <S.NavItem to="/" end>
          Home
        </S.NavItem>
        <S.NavItem to="/general-chat">General</S.NavItem>
      </S.Nav>

      <S.Login to="/login">Login</S.Login>
      <S.SignUp to="/signup">Sign Up</S.SignUp>
    </S.Container>
  );
};

export default Header;
