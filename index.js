import Button from './src/Button';
import Loader from './src/Loader';
import Seperator from './src/Seperator';
import Checkbox from './src/Checkbox';
import Text from './src/Text';
import TextInput from './src/TextInput';
import Picker from './src/Picker';
import DateTime from './src/DateTime';
import Map from './src/Map';
import Image from './src/Image';
import Header from './src/Header';
import Badge from './src/Badge';
import HView from './src/HView';
import Modal from './src/Modal';
import ImageCarousel from './src/ImageCarousel';
import ImageViewer from './src/ImageViewer';
import Alert from './src/Alert';
import Container from './src/Container';
import Chat from './src/Chat';
import { log } from './funcs';

class Nuno {
  // constructor(props) {
  //   log('Nuno Constructor', props);
  //   this._config = {
  //     theme: props.theme,
  //   };
  // };
  static init(props) {
    log('Nuno Init', props);
    Nuno.config = {
      themeColor: props.themeColor,
      headerTitleWeight: props.headerTitleWeight,
      ...props,
    }
  }
  // set config(data) {
  //   this._config = {
  //     ...this._config,
  //     ...data
  //   }
  // }
  // get config() {
  //   return this._config;
  // }
}
export {
  Nuno,
  Button,
  Loader,
  Seperator,
  Checkbox,
  Text,
  TextInput,
  Picker,
  DateTime,
  Map,
  Image,
  Header,
  Badge,
  HView,
  Modal,
  ImageCarousel,
  ImageViewer,
  Alert,
  Container,
  Chat,
};
