import {observer} from "mobx-react-lite";

const NerdFaceImage = observer(({style = { width: 80 }}) => {

  return (<img
    alt="nerd-face-image"
    src={process.env.PUBLIC_URL + "/img/nerd.png"}
    style={style}
  />);
})

export default NerdFaceImage;