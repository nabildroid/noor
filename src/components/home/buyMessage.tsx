/* This example requires Tailwind CSS v2.0+ */
import { CheckCircle } from "react-feather";

const includedFeatures = [
  "الميزة الاولة",
  "الميزة الثانية",
  "الميزة الثالثة",
];

export default function Example() {
  return (
    <div className="bg-gray-100">
      <div className="pt-6 sm:pt-8 lg:pt-16 font-arabic">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
              اشةري الان الوضع المدفةوع
            </h2>
            <p className="mt-4 text-xl text-gray-600">
            أم ساعة مشروط وعُرفت هذه, تحرّك المدن سبتمبر ومن بل, الذود السيطرة لم فقد. أم إيو مشارف . عل وسفن الأمريكية ذات, طوكيو
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 bg-white pb-16 sm:mt-12 sm:pb-20 lg:pb-28">
        <div className="relative">
          <div className="absolute inset-0 h-1/2 bg-gray-100" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex flex-row-reverse">
              <div className="flex-1 bg-white px-6 py-8 lg:p-12">
                <h3 className="text-2xl text-right font-extrabold text-gray-900 sm:text-3xl">
                  الخطة الشهرية
                </h3>
                <p className="mt-6 text-base text-gray-500 text-right">
                فشكّل الطرفين في, غريمه الأمور حين في. وتم بـ حلّت حالية لفرنسا, عل بالرّغم واعتلاء استطاعوا أضف,
                </p>
                <div className="mt-8">
                  <div className="flex flex-row-reverse items-center">
                    <h4 className="flex-shrink-0 pl-4 bg-white text-sm tracking-wider font-semibold uppercase text-indigo-600">
                      الميزاة
                    </h4>
                    <div className="flex-1 border-t-2 border-gray-200" />
                  </div>
                  <ul
                  style={{direction:"rtl"}}
                    role="list"
                    className="mt-8 space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5"
                  >
                    {includedFeatures.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start lg:col-span-1"
                      >
                        <div className="flex-shrink-0">
                          <CheckCircle
                            className="h-5 w-5 text-green-400"
                            aria-hidden="true"
                          />
                        </div>
                        <p className="mr-3 text-sm text-gray-700">{feature}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="py-8 px-6 text-center bg-gray-50 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
                
                <div className="mt-4 flex items-center justify-center text-5xl font-extrabold text-gray-900">
                  <span>$349</span>
                  <span className="ml-3 text-xl font-medium text-gray-500">
                    USD
                  </span>
                </div>

                <div className="mt-6">
                  <div className="rounded-md shadow">
                    <a
                      href="#"
                      className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-800 hover:bg-indigo-900"
                    >
                      ادفع الان
                    </a>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
