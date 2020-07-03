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
import Carousel from './src/Carousel';
import ImageCarousel from './src/ImageCarousel';
import ImageViewer from './src/ImageViewer';
import Alert from './src/Alert';
import Container from './src/Container';
import Chat from './src/Chat';
import Switch from './src/Switch';
import { log } from './funcs';

class Nuno {
  static init(props) {
    log('Nuno Init', props);
    Nuno.config = {
      themeColor: props.themeColor,
      textColor: props.textColor,
      headerTitleWeight: props.headerTitleWeight,
      ...props,
    }
  }
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
  Carousel,
  ImageCarousel,
  ImageViewer,
  Alert,
  Container,
  Chat,
  Switch,
};
