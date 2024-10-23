import {observer} from "mobx-react-lite";

const NerdFaceImage = observer(() => {

  return (<img
    alt="nerd-face-image"
    src={process.env.PUBLIC_URL + "/NerdFace.png"}
    style={{ width: 80, height: 80 }}
  />);
})

export default NerdFaceImage;