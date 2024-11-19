'use client'

import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast, Toaster } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Loader2 } from 'lucide-react'

const formSchema = z.object({
  Email: z.string().email({ message: 'Email inválido' }),
  'Experiência Roteiro': z
    .string()
    .min(1, { message: 'Este campo é obrigatório' }),
  'Experiência Núcleos': z
    .string()
    .min(1, { message: 'Este campo é obrigatório' }),
  'Projetos Pessoais': z
    .string()
    .min(1, { message: 'Este campo é obrigatório' }),
  'Portfolio/Currículo': z
    .union([z.string().url({ message: 'URL inválida' }), z.string().length(0)])
    .optional(),
  'Experiência Pesquisa': z
    .string()
    .min(1, { message: 'Este campo é obrigatório' }),
  'Identificação ODS Razão': z
    .string()
    .min(1, { message: 'Este campo é obrigatório' }),
  'Projetos ODS Relação': z
    .string()
    .min(1, { message: 'Este campo é obrigatório' }),
  'Nos conte mais sobre você': z
    .string()
    .min(1, { message: 'Este campo é obrigatório' }),
})

type FormData = z.infer<typeof formSchema>

interface FormFieldProps {
  label: string
  id: string
  children: React.ReactNode
}

const FormField: React.FC<FormFieldProps> = ({ label, id, children }) => (
  <div className="space-y-2">
    <Label htmlFor={id} className="text-base">
      {label}
    </Label>
    {children}
  </div>
)

export default function TwoColumnApplicationFormStep2() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [cooldownTime, setCooldownTime] = useState(0)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Email: '',
      'Experiência Roteiro': '',
      'Experiência Núcleos': '',
      'Projetos Pessoais': '',
      'Portfolio/Currículo': undefined,
      'Experiência Pesquisa': '',
      'Identificação ODS Razão': '',
      'Projetos ODS Relação': '',
      'Nos conte mais sobre você': '',
    },
  })

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (cooldownTime > 0) {
      timer = setInterval(() => {
        setCooldownTime((prevTime) => prevTime - 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [cooldownTime])

  const onSubmit = async (data: FormData) => {
    if (isSubmitted || cooldownTime > 0) {
      toast.error('Por favor, aguarde antes de enviar novamente.', {
        duration: 5000,
        style: {
          background: '#FFA500',
          color: '#FFFFFF',
          border: 'none',
        },
        icon: '⏳',
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/submit-form-step2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const responseData = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        setCooldownTime(300) // 5 minutes cooldown
        toast.success('Formulário enviado com sucesso!', {
          style: {
            background: '#4CAF50',
            color: '#FFFFFF',
            border: 'none',
          },
          icon: '🎉',
        })
      } else {
        throw new Error(responseData.message || 'Erro ao enviar formulário')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Erro desconhecido ao enviar formulário'

      if (
        errorMessage.includes('não corresponde a nenhum registro da Etapa 1')
      ) {
        toast.error(errorMessage, {
          style: {
            background: '#F44336',
            color: '#FFFFFF',
            border: 'none',
          },
          icon: '❌',
          duration: 10000, // Longer duration for this important message
        })
      } else {
        toast.error(`Erro ao enviar formulário: ${errorMessage}`, {
          style: {
            background: '#F44336',
            color: '#FFFFFF',
            border: 'none',
          },
          icon: '❌',
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#333',
            color: '#fff',
            border: '1px solid #555',
            borderRadius: '8px',
            padding: '16px',
            fontSize: '16px',
          },
        }}
      />
      <div className="mx-auto px-4 py-8 md:w-[80%] font-raleway">
        <h1 className="text-4xl font-bold text-center mb-8">
          Núcleo Criativo para Desenvolvimento de Propriedade Intelectual
        </h1>
        <div className="flex flex-col-reverse lg:flex-col-reverse gap-4">
          <div className="max-h-[calc(100vh-150px)] ">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-8 relative"
            >
              <div className="space-y-6 pb-10">
                <div className="absolute right-4 top-5 z-10">
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <ellipse
                      cx="6.61565"
                      cy="6.61565"
                      rx="1.69231"
                      ry="1.69231"
                      fill="#111"
                    />
                    <ellipse
                      cx="74.0004"
                      cy="72.7695"
                      rx="1.69231"
                      ry="1.69231"
                      fill="#111"
                    />
                    <ellipse
                      cx="32.0001"
                      cy="2.46154"
                      rx="2.46155"
                      ry="2.46154"
                      fill="#111"
                    />
                    <ellipse
                      cx="61.2311"
                      cy="2.46154"
                      rx="2.46155"
                      ry="2.46154"
                      fill="#111"
                    />
                    <ellipse
                      cx="76.3078"
                      cy="17.2311"
                      rx="2.76924"
                      ry="2.76924"
                      fill="#111"
                    />
                    <ellipse
                      cx="2.76924"
                      cy="61.5383"
                      rx="2.76924"
                      ry="2.76924"
                      fill="#111"
                    />
                    <ellipse
                      cx="2.46155"
                      cy="31.6925"
                      rx="2.46155"
                      ry="2.46154"
                      fill="#111"
                    />
                    <ellipse
                      cx="17.2311"
                      cy="76.3077"
                      rx="2.46155"
                      ry="2.46154"
                      fill="#111"
                    />
                    <ellipse
                      cx="46.7695"
                      cy="76.3075"
                      rx="3.69232"
                      ry="3.69231"
                      fill="#111"
                    />
                    <ellipse
                      cx="17.2309"
                      cy="17.2309"
                      rx="3.69232"
                      ry="3.69231"
                      fill="#111"
                    />
                    <ellipse
                      cx="31.9999"
                      cy="61.5385"
                      rx="5.53848"
                      ry="5.53847"
                      fill="#111"
                    />
                    <ellipse
                      cx="46.7694"
                      cy="17.2309"
                      rx="5.53848"
                      ry="5.53847"
                      fill="#111"
                    />
                    <ellipse
                      cx="61.2309"
                      cy="31.6923"
                      rx="5.53848"
                      ry="5.53847"
                      fill="#111"
                    />
                    <ellipse
                      cx="61.2312"
                      cy="61.5383"
                      rx="4.92309"
                      ry="4.92309"
                      fill="#111"
                    />
                    <ellipse
                      cx="46.7696"
                      cy="46.7691"
                      rx="8.00003"
                      ry="8.00002"
                      fill="#111"
                    />
                    <ellipse
                      cx="31.9999"
                      cy="31.6927"
                      rx="7.38464"
                      ry="7.38463"
                      fill="#111"
                    />
                    <ellipse
                      cx="17.2309"
                      cy="46.7694"
                      rx="5.53848"
                      ry="5.53847"
                      fill="#111"
                    />
                    <ellipse
                      cx="76.3076"
                      cy="46.769"
                      rx="3.69232"
                      ry="3.69231"
                      fill="#111"
                    />
                  </svg>
                </div>
                <h2 className="text-4xl font-semibold italic">ETAPA 2</h2>

                <FormField label="Email" id="Email">
                  <Controller
                    name="Email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Insira o mesmo email utilizado na Etapa 1"
                      />
                    )}
                  />
                  {errors.Email && (
                    <p className="text-red-500">{errors.Email.message}</p>
                  )}
                </FormField>

                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold italic">
                    EXPERIÊNCIA COM ROTEIRO E AUDIOVISUAL
                  </h3>

                  <FormField
                    label="Experiência em Roteiro e Audiovisual"
                    id="Experiencia Roteiro"
                  >
                    <Controller
                      name="Experiência Roteiro"
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          placeholder="Conte sobre sua experiência prévia em roteiro e projetos audiovisuais"
                        />
                      )}
                    />
                    {errors['Experiência Roteiro'] && (
                      <p className="text-red-500">
                        {errors['Experiência Roteiro'].message}
                      </p>
                    )}
                  </FormField>

                  <FormField
                    label="Experiência em Núcleos Criativos"
                    id="Experiência Núcleos"
                  >
                    <Controller
                      name="Experiência Núcleos"
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          placeholder="Conte sobre sua experiência com núcleos criativos, laboratórios de roteiros etc. O que gostou e o que não gostou?"
                        />
                      )}
                    />
                    {errors['Experiência Núcleos'] && (
                      <p className="text-red-500">
                        {errors['Experiência Núcleos'].message}
                      </p>
                    )}
                  </FormField>

                  <FormField label="Projetos Pessoais" id="Projetos Pessoais">
                    <Controller
                      name="Projetos Pessoais"
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          placeholder="Liste alguns projetos pessoais com que tenha trabalhado ou esteja trabalhando atualmente. Não é necessário entrar em detalhes, mencione o principal tema e o que te motiva a trabalhar com o assunto/formato/gênero."
                        />
                      )}
                    />
                    {errors['Projetos Pessoais'] && (
                      <p className="text-red-500">
                        {errors['Projetos Pessoais'].message}
                      </p>
                    )}
                  </FormField>

                  <FormField
                    label="Portfólio/Currículo (Opcional)"
                    id="Portfolio/Currículo"
                  >
                    <Controller
                      name="Portfolio/Currículo"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Insira o link para seu portfólio ou currículo"
                        />
                      )}
                    />
                    {errors['Portfolio/Currículo'] && (
                      <p className="text-red-500">
                        {errors['Portfolio/Currículo'].message}
                      </p>
                    )}
                  </FormField>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold italic">
                    IDENTIFICAÇÃO COM OS OBJETIVOS DE DESENVOLVIMENTO
                    SUSTENTÁVEL
                  </h3>

                  {/* Textarea ODS identificação */}
                  <FormField
                    label="Por que você se identifica com os ODS selecionados na etapa anterior?"
                    id="Identificação ODS Razão"
                  >
                    <Controller
                      name="Identificação ODS Razão"
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          placeholder="Explique por que você se identifica com os ODS selecionados na etapa anterior"
                        />
                      )}
                    />
                    {errors['Identificação ODS Razão'] && (
                      <p className="text-red-500">
                        {errors['Identificação ODS Razão'].message}
                      </p>
                    )}
                  </FormField>

                  {/* Textarea ODS Projeto */}
                  <FormField
                    label="Descreva como seus projetos se relacionam com os ODS selecionados na etapa anterior"
                    id="Projetos ODS Relação"
                  >
                    <Controller
                      name="Projetos ODS Relação"
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          placeholder="Explique como seus projetos se relacionam com os ODS selecionados na etapa anterior"
                        />
                      )}
                    />
                    {errors['Projetos ODS Relação'] && (
                      <p className="text-red-500">
                        {errors['Projetos ODS Relação'].message}
                      </p>
                    )}
                  </FormField>
                </div>

                {/* Experiência e interesse em Pesquisa */}
                <FormField
                  label="Experiência e interesse em Pesquisa"
                  id="Experiência Pesquisa"
                >
                  <Controller
                    name="Experiência Pesquisa"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        placeholder="Conte sobre sua experiência e envolvimento com pesquisa, podendo ser acadêmica, científica, investigação de tema para projetos de escrita etc."
                      />
                    )}
                  />
                  {errors['Experiência Pesquisa'] && (
                    <p className="text-red-500">
                      {errors['Experiência Pesquisa'].message}
                    </p>
                  )}
                </FormField>

                <FormField
                  label="Nos conte mais sobre você:"
                  id="Nos conte mais sobre você"
                >
                  <Controller
                    name="Nos conte mais sobre você"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        placeholder="Um espaço para você expressar qualquer coisa que não foi abordada nas questões anteriores, pode falar dos seus hobbies, da sua história, ou de qualquer outro ponto que achar relevante para equipe tomar conhecimento."
                      />
                    )}
                  />
                  {errors['Nos conte mais sobre você'] && (
                    <p className="text-red-500">
                      {errors['Nos conte mais sobre você'].message}
                    </p>
                  )}
                </FormField>

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    'Enviar Inscrição'
                  )}
                </Button>
              </div>
            </form>
          </div>
          <div className="space-y-4 pb-12 text-center lg:text-left">
            <h2 className="text-2xl font-bold mb-4">
              Informações sobre o Formulário - Etapa 2
            </h2>
            <p className="mb-4">
              Esta é a segunda etapa do processo de seleção para o Núcleo de
              Desenvolvimento de Roteiros “História em Pesquisa”. Nesta fase,
              queremos conhecer melhor você, e entender seus interesses e
              experiências na área do audiovisual.
            </p>
            <h3 className="text-xl font-semibold mb-2">Importante:</h3>
            <ul className="list-disc list-inside mb-4">
              <li>Certifique-se de usar o mesmo email utilizado na Etapa 1.</li>
              <li>
                Seja transparente em suas respostas – não há resposta certa ou
                errada. Quanto mais entendermos o seu perfil, melhor poderemos
                conectá-lo a uma pesquisa.
              </li>
            </ul>
            <h3 className="text-xl font-semibold mb-2">Próximos Passos:</h3>
            <p className="mb-4">
              Você tem até o dia 29 de novembro para completar suas respostas.
              Os selecionados serão contactados pela equipe para uma rápida
              entrevista.
            </p>
            <h3 className="text-xl font-semibold mb-2">Lembre-se:</h3>

            <p>
              Qualquer dúvida sobre o processo pode ser enviada ao e-mail:{' '}
              <a
                href="mailto:contato@papoulahub.com"
                className="font-bold underline text-sky-900 tracking-wide"
              >
                contato@papoulahub.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
