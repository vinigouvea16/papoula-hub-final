// app/api/submit-form-step2/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Airtable from 'airtable'

const base = new Airtable({ apiKey: process.env.AIRTABLE_PAT }).base(
  process.env.AIRTABLE_BASE_ID!,
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { Email, ...step2Data } = body

    const records = await base('Candidatos')
      .select({
        filterByFormula: `{Email} = '${Email}'`,
      })
      .firstPage()

    if (records.length > 0) {
      const updatedRecord = await base('Candidatos').update(records[0].id, {
        ...step2Data,
      })
      return NextResponse.json(
        {
          message: 'Form submitted successfully',
          record: updatedRecord,
        },
        { status: 200 },
      )
    } else {
      return NextResponse.json(
        {
          message:
            'O email fornecido não corresponde a nenhum registro da Etapa 1. Por favor, verifique se você está usando o mesmo email utilizado anteriormente.',
        },
        { status: 404 },
      )
    }
  } catch (error) {
    console.error('Error submitting form:', error)
    return NextResponse.json(
      {
        message:
          'Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.',
      },
      { status: 500 },
    )
  }
}
