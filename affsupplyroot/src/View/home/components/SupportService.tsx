import { Card, CardContent } from "@/components/ui/card"
import { FaTruck, FaShieldAlt, FaStore, FaUsers } from "react-icons/fa"
import { supportServices } from "../variable"

export function SupportServices() {

  return (
    <section className="py-16  font-manuale ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-yellow-secondary">Dịch vụ hỗ trợ</span>
          </h2>
          <p className="text-yellow-primary max-w-2xl mx-auto">
            Chúng tôi cung cấp các dịch vụ hỗ trợ toàn diện cho nông dân và người tiêu dùng
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {supportServices.map((service) => (
            <Card
              key={service.id}
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 group"
            >
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-green-primary flex items-center justify-center shrink-0">
                <service.icon className="w-6 h-6 text-yellow-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1 text-yellow-secondary">{service.title}</h3>
                <p className="text-green-100 text-sm leading-relaxed mb-2">{service.description}</p>

                <ul className="space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-yellow-primary">
                      <span className="w-1.5 h-1.5 bg-yellow-primary rounded-full mr-2 flex-shrink-0"></span>
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
