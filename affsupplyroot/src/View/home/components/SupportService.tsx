import { Card, CardContent } from "@/components/ui/card"
import { supportServices } from "../variable"

export function SupportServices() {
  return (
    <section className="py-8 sm:py-12 lg:py-16 font-manuale">
      <div className="container mx-auto lg:px-10 px-4">
        {/* Title */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">
            <span className="text-yellow-secondary">Dịch vụ hỗ trợ</span>
          </h2>
          <p className="text-yellow-primary max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Chúng tôi cung cấp các dịch vụ hỗ trợ toàn diện cho nông dân và người tiêu dùng
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {supportServices.map((service) => (
            <Card
              key={service.id}
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 hover:scale-[1.02] transition-all duration-300 group"
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  {/* Icon */}
                  <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-green-primary flex items-center justify-center shrink-0">
                    <service.icon className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 text-yellow-primary" />
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg md:text-xs lg:text-xl font-bold mb-1 text-yellow-secondary">
                      {service.title}
                    </h3>
                    <p className="text-green-100 text-xs sm:text-sm md:text-base leading-relaxed mb-2">
                      {service.description}
                    </p>

                    <ul className="space-y-1 sm:space-y-2">
                      {service.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center text-xs sm:text-sm md:text-base text-yellow-primary"
                        >
                          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-yellow-primary rounded-full mr-2 flex-shrink-0"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
