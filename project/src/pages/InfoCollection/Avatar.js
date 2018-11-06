import { Upload, Icon, message } from 'antd';
import './Avatar.less';
import { connect } from 'dva';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}
function getRootPath(){
  let url=location.href;
  const pathname=window.location.pathname;
  const index=url.indexOf(pathname);
  let rootPath=url.slice(0,index);
  return rootPath;
}

@connect(({ collect }) => ({
  imageUrl:collect.imageUrl,
}))
class Avatar extends React.Component {
  state = {
    loading: false,
  };

  handleChange = (info) => {
    const { dispatch } = this.props;
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        this.setState({
          imageUrl,
          loading: false,
        })
        dispatch({
          type:"collect/getImageUrl",
          payload:imageUrl,
        });
      });
    }
  }
  componentDidMount(){
    
  }
  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">点击上传图片</div>
      </div>
    );
    const imageUrl = this.props.imageUrl;
    const rootPath=getRootPath();
    return (
        <div id={this.props.id}>
            {imageUrl ? <img src={imageUrl} alt="&nbsp;&nbsp;请重新上传图片" /> : null}
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={rootPath}
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
            >
                {uploadButton}
            </Upload>
        </div>
    );
  }
}
export default Avatar;