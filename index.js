import Button from './src/Button';
import ButtonMulti from './src/ButtonMulti';
import ButtonGroup from './src/ButtonGroup';
import Loader from './src/Loader';
import LoaderFull from './src/LoaderFull';
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
import ProfileBar from './src/Profile';
import DoubleTap from './src/DoubleTap';
import Icon from './src/Icon';

class Nuno {
  static init(props) {
    console.log('[NUNO CONFIG]', props);
    Nuno.config = props;
  }
}
export {
  Nuno,
  Button,
  ButtonMulti,
  ButtonGroup,
  Loader,
  LoaderFull,
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
  ProfileBar,
  DoubleTap,
  Icon,
};
