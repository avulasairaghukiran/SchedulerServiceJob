import { useLanguage } from "../../context/LocaleProvider";
import EmptyBoxSvg from "./empty-box.svg";
import { StyledText, StyledWrapper } from "./styles";
const EmptyBox = () => {
  const { feelingEmpty } = useLanguage();
  return (
    <StyledWrapper>
    <img src={EmptyBoxSvg} alt="" />
      <StyledText>{feelingEmpty}</StyledText>
    </StyledWrapper>
  );
};

export default EmptyBox;
