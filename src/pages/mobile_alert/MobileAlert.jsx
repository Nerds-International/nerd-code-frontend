import {observer} from "mobx-react-lite";
import NerdFaceImage from "../../components/nerd_face_image/NerdFaceImage";

const MobileAlert = observer(() => {
  return (<div className="only-for-desktop-alert">
    <div className="only-for-desktop-alert-image">
      <NerdFaceImage style={{ width: 200 }}/>
    </div>
    <div className="only-for-desktop-alert-text">
      Unavailable for mobile
    </div>
  </div>);
})

export default MobileAlert;