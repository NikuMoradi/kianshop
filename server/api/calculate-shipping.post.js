//server/api/calculate-shipping.post.js
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { to_city_code, weight, price, serviceType, courierCode } = body;

    if (!to_city_code || !weight || !price || !courierCode || !serviceType) {
      throw new Error("لطفاً شهر مقصد و وزن را وارد کنید.");
    }

    const apiKey = useRuntimeConfig().public.postexApiKey;
    const apiUrl = "https://api.postex.ir/api/v1/shipping/quotes";
    const payload = {
      from_city_code: 1,
      pickup_needed: false,
      courier: {
        courierCode: courierCode,
        serviceType: serviceType,
      },
      parcels: [
        {
          custom_parcel_id: "",
          to_city_code: 1,
          payment_type: "SENDER",
          parcel_properties: {
            total_weight: weight,
            total_value: price,
            box_type_id: 1,
          },
        },
      ],
      value_added_service: {},
    };

    const response = await $fetch(apiUrl, {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: payload,
    });
    console.log();
    if (response.isSuccess) {
      return {
        status: "success",
        data: response.data,
      };
    } else {
      throw new Error(response.message || "خطا در محاسبه هزینه");
    }
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
});
