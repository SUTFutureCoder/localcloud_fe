## 远程  
### 1 远程连接
> /config/connection get

#### 输入
暂无，需要身份认证时再说

    {
        "uid":"asdfasdfasdf"  
    }  
    
#### 输出
    {
       error_no: 0,
       error_msg: "",
       data: {
           token: "abc123" //根据uid算出的SHA256加密后的token
       }
    }