import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Space, message } from "antd";
import { sendWhatsappMessageApi } from "../../api/whatsapp";
import { IoIosSettings } from "react-icons/io";

const Homepage = () => {
  const [loading, setLoading] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);

  const [instanceId, setInstanceId] = useState("instance89382");
  const [token, setToken] = useState("42mcxxtti6bzpru2");

  const sendWhatsappMessageLists = async (phoneNumberLists, message, config) => {
    const result = await Promise.all(
      phoneNumberLists.map(async (phoneNumber) => {
        return await sendWhatsappMessageApi(phoneNumber, message, config);
      }),
    );
    return result;
  };

  const handleChangeSetting = () => {
    if(openSetting){
        message.success("ບັນທຶກການຕັ້ງຄ່າແລ້ວ")
        setOpenSetting(false); 
        return;
    }
    setOpenSetting(true);
  };

  const onFinish = async (values) => {
    if(!token || !instanceId){
        message.error("ກະລຸນາເພີ່ມການຕັ້ງຄ່າ");
        return;  
    }
    if (values.users.length === 0) {
      message.error("ກະລຸນາເພີ່ມເບີ");
      return;
    }
    setLoading(true);
    const phoneNumberLists = values.users.map((user) => user.number);
    const messageValue = values.message;
    const config = {
      instanceId: instanceId,
      token: token,
    }
    const result = await sendWhatsappMessageLists(
      phoneNumberLists,
      messageValue,
      config
    );
    setLoading(false);
    message.success("ສົ່ງຂໍ້ຄວາມສຳເລັດ");
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-800 p-8">
      <div className="w-[500px] rounded-md bg-white px-6 py-2">
        <div className="grid grid-cols-12 mt-2">
            <div className="col-start-2 col-span-10">
                <h1 className="text-gray-800 flex justify-center items-center">
                    ສົ່ງຂໍ້ຄວາມຜ່ານ{" "}
                    <span className="font-semibold text-green-500">Whatsapp</span>
                </h1>
            </div>
            <div className="w-full h-full flex justify-center items-center">
                <button onClick={handleChangeSetting} className="p-1 flex justify-center items-center hover:bg-gray-100 rounded-sm">
                    <IoIosSettings size={20} className="text-gray-400 hover:text-gray-500" />
                </button>
            </div>
        </div>
        {openSetting && (
            <div className="mt-4 w-full min-h-[100px] bg-gray-100 rounded-sm p-3 outline outline-1 outline-gray-200">
                <p className="text-gray-400 text-sm mt-2 mb-4">-- ຕັ້ງຄ່າ user.ultramsg.com --</p>
                <p className="text-gray-800 text-sm">Instance ID:</p>
                <Input
                    onChange={(e) => setInstanceId(e.target.value)}
                    value={instanceId}
                    className="w-full"
                    placeholder="instance89382"
                />
                <p className="text-gray-800 text-sm mt-4">Token:</p>
                <Input
                    onChange={(e) => setToken(e.target.value)}
                    value={token}
                    className="w-full"
                    placeholder="42mcxxtti6bzpru2"
                />
            </div>
        )}
        <div className="mt-4 w-full">
          <Form
            disabled={loading}
            name="dynamic_form_nest_item"
            onFinish={onFinish}
            style={{
              maxWidth: 600,
            }}
            autoComplete="off"
          >
            <Form.List name="users">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key} className="grid grid-cols-12">
                      <Form.Item
                        className="col-span-11"
                        {...restField}
                        name={[name, "number"]}
                        rules={[
                          {
                            required: true,
                            message: "ກະລຸນາເພີ່ມເບີ",
                          },
                        ]}
                      >
                        <InputNumber
                          className="w-full"
                          controls={false}
                          addonBefore="+856 20"
                          placeholder="55****56"
                        />
                      </Form.Item>
                      <div className="col-span-1 flex flex-col">
                        <div className="flex h-[32px] w-full justify-center">
                          <MinusCircleOutlined
                            className="px-2"
                            onClick={() => {
                              if (!loading) remove(name);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      ເພີ່ມເບີ Whatsapp
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item
              className="mb-12"
              label="ຂໍ້ຄວາມ"
              name="message"
              rules={[
                {
                  required: true,
                  message: "ກະລຸນາປ້ອນຂໍ້ຄວາມ",
                },
              ]}
            >
              <TextArea
                placeholder="ສະບາຍດີ..."
                autoSize={{
                  minRows: 3,
                  maxRows: 5,
                }}
              />
            </Form.Item>
            <div className="w-full">
              <Form.Item className="w-full">
                <Button
                  loading={loading}
                  className="w-full bg-green-500"
                  type="primary"
                  htmlType="submit"
                >
                  ສົ່ງ
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
