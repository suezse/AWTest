import React from 'react';
import { Icon } from 'antd';
import './index.less';

const Header: React.FC<any> = () => {
  return (
    <footer className="footer">
      <div className="comments">
        {`Made with `}
        <i>
          <Icon type="heart" theme="filled" />
        </i>
        {` in Melbourne.`}
      </div>
      <div>
        <Icon type="copyright" />
        {` 2016 Broccoli & Co. All rights reserved.`}
      </div>
    </footer>
  );
};

export default Header;
