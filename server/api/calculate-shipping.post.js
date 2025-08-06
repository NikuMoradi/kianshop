export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const {
      order_type,
      origin_province,
      destination_province,
      origin_city,
      destination_city,
      weight,
      price,
    } = body;

    // Validate inputs
    if (
      !order_type ||
      !origin_province ||
      !destination_province ||
      !origin_city ||
      !destination_city ||
      !weight ||
      !price
    ) {
      throw new Error(
        "لطفاً اطلاعات استان مبدا، استان مقصد، شهر مبدا، شهر مقصد، وزن و قیمت را وارد کنید.",
      );
    }

    const apiUrl = "https://public.api.tapin.ir/api/v1/public/check-price/";

    const payload = {
      rate_type: "tapin",
      price: parseInt(price),
      weight: parseInt(weight),
      order_type: order_type, //
      pay_type: 1, // پرداخت آنلاین (بر اساس جدول نوع پرداخت)
      to_province: parseInt(destination_province),
      from_province: parseInt(origin_province),
      to_city: parseInt(destination_city),
      from_city: parseInt(origin_city),
      box_id: 10, // شناسه بسته پستی (می‌تونید بر اساس نیاز تغییر بدید)
    };

    const response = await $fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
    });

    if (response.returns.status === 200) {
      return {
        status: "success",
        data: response.entries,
      };
    } else {
      throw new Error(response.returns.message || "خطا در محاسبه هزینه");
    }
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
});
