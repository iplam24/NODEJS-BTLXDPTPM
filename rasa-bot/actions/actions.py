from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet, FollowupAction
import requests
import json

class ActionChaoHoi(Action):
    """Xử lý intent chào hỏi"""

    def name(self) -> Text:
        return "action_chao_hoi"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        dispatcher.utter_message(response="utter_chao_hoi")
        return []


class ActionHoiGiaXe(Action):
    """Xử lý intent hỏi giá xe"""

    def name(self) -> Text:
        return "action_hoi_gia_xe"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        # Có thể thêm logic kiểm tra loại xe cụ thể nếu cần
        dispatcher.utter_message(response="utter_hoi_gia_xe")
        return []


class ActionHoiKhuyenMai(Action):
    """Xử lý intent hỏi khuyến mãi"""

    def name(self) -> Text:
        return "action_hoi_khuyen_mai"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        # Có thể kết nối với API khuyến mãi thực tế
        dispatcher.utter_message(response="utter_hoi_khuyen_mai")
        return []


class ActionHoiThongSoKyThuat(Action):
    """Xử lý intent hỏi thông số kỹ thuật"""

    def name(self) -> Text:
        return "action_hoi_thong_so_ky_thuat"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        dispatcher.utter_message(response="utter_hoi_thong_so_ky_thuat")
        return []


class ActionHoiDiaChiShowroom(Action):
    """Xử lý intent hỏi địa chỉ showroom"""

    def name(self) -> Text:
        return "action_hoi_dia_chi_showroom"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        # Lấy thành phố từ slot nếu có
        city = tracker.get_slot("city")
        
        if city:
            if city.lower() in ["hà nội", "hanoi", "hn"]:
                dispatcher.utter_message(text="Showroom VinFast tại Hà Nội: 7 Phạm Hùng, Nam Từ Liêm")
            elif city.lower() in ["hồ chí minh", "hcm", "sài gòn", "saigon"]:
                dispatcher.utter_message(text="Showroom VinFast tại TP.HCM: 171 Nguyễn Thị Minh Khai, Quận 3")
            else:
                dispatcher.utter_message(text=f"VinFast có showroom ở nhiều tỉnh thành. Tôi sẽ tìm đại lý gần nhất tại {city} và gửi lại bạn.")
                # Có thể gọi API tìm đại lý ở đây
        else:
            dispatcher.utter_message(response="utter_hoi_dia_chi_showroom")
        
        return []


class ActionCamOn(Action):
    """Xử lý intent cảm ơn"""

    def name(self) -> Text:
        return "action_cam_on"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        dispatcher.utter_message(response="utter_cam_on")
        return []


class ActionDefaultFallback(Action):
    """Xử lý khi bot không hiểu câu hỏi"""

    def name(self) -> Text:
        return "action_default_fallback"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        dispatcher.utter_message(text="Xin lỗi, tôi chưa hiểu câu hỏi của bạn. Bạn có thể hỏi về: giá xe, khuyến mãi, thông số kỹ thuật hoặc địa chỉ showroom VinFast.")
        return []


class ActionLuuThongTinLienHe(Action):
    """Lưu thông tin liên hệ khi khách hàng muốn đăng ký tư vấn"""

    def name(self) -> Text:
        return "action_luu_thong_tin_lien_he"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        # Lấy thông tin từ slots
        name = tracker.get_slot("name")
        phone = tracker.get_slot("phone")
        email = tracker.get_slot("email")
        car_model = tracker.get_slot("car_model")

        # Kiểm tra thông tin đầy đủ
        if not phone:
            dispatcher.utter_message(text="Vui lòng cung cấp số điện thoại để chúng tôi có thể liên hệ lại với bạn.")
            return []
        
        # Lưu vào database hoặc gửi email (giả lập)
        # Trong thực tế, bạn sẽ kết nối với CRM hoặc database ở đây
        
        dispatcher.utter_message(text=f"Cảm ơn {name if name else 'bạn'} đã quan tâm đến VinFast. Chúng tôi đã nhận thông tin và sẽ liên hệ lại qua số {phone} sớm nhất.")
        
        return [SlotSet("name", None), SlotSet("phone", None), SlotSet("email", None), SlotSet("car_model", None)]


class ActionGuiThongTinTestDrive(Action):
    """Xử lý yêu cầu đăng ký lái thử"""

    def name(self) -> Text:
        return "action_gui_thong_tin_test_drive"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        # Lấy thông tin từ slots
        name = tracker.get_slot("name")
        phone = tracker.get_slot("phone")
        car_model = tracker.get_slot("car_model")
        location = tracker.get_slot("location")
        date = tracker.get_slot("date")

        # Kiểm tra thông tin bắt buộc
        if not phone or not car_model:
            dispatcher.utter_message(text="Vui lòng cung cấp số điện thoại và dòng xe bạn muốn lái thử.")
            return []

        # Gửi thông tin đến hệ thống (giả lập)
        # Trong thực tế, bạn sẽ gọi API ở đây
        
        dispatcher.utter_message(text=f"Đã ghi nhận yêu cầu lái thử {car_model} của {name if name else 'bạn'}. Nhân viên VinFast sẽ liên hệ qua số {phone} để xác nhận lịch hẹn.")
        
        return [SlotSet("name", None), SlotSet("phone", None), SlotSet("car_model", None), 
                SlotSet("location", None), SlotSet("date", None)]

class ActionHoiTen(Action):
    """Action hỏi tên khách hàng"""

    def name(self) -> Text:
        return "action_hoi_ten"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        dispatcher.utter_message(response="utter_hoi_ten")
        return [SlotSet("requested_slot", "name")]