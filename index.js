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

class Config {
  constructor(props) {
    console.log('Config Constructor', props);
    this.config = props;
  };
  set config(data) {
    this.config = {
      ...this.config,
      ...data
    }
  }
  get config() {
    return this.config;
  }
}
export {
  Config,
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
