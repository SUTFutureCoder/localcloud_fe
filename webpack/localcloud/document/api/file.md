## 文件
### 1 上传
#### 1.1 发送上传请求
> /file/upload post

#### 输入

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

### 2 列表

### 3 下载
 