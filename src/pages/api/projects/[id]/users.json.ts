import supabase from '@/supabase';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {

  const project = await supabase
    .from('projects')
    .select()
    .eq('token_symbol', context.params['id'])
    .single()
    .then(res => res.data)

  const metrics = await supabase.from('wallet_metrics_view')
    .select()
    .eq('project_id', project.token_address)
    .then(res => res.data)

  const tagged = metrics?.map((metric, i) => {
    const tags = new Set()
    metric.stats.map((stat: {
      key: string
      value: number
      campaign_id: number
      subscribed: boolean
    }) => {
      metric.id = i
      if (stat.campaign_id) {
        tags.add('CAMPAIGN:' + stat.campaign_id)
      }
      if (stat.key === 'visit') {
        if (stat.value > 10)
          tags.add('FREQUENT_VISITOR')
        else if (stat.value === 1)
          tags.add('FIRST_TIME_VISITOR')
      }
      else if (stat.key === 'reply') {
        if (stat.value > 10)
          tags.add('FREQUENT_ENGAGEMENT')
        else if (stat.value === 1)
          tags.add('FIRST_TIME_ENGAGEMENT')

      } else if (stat.key === 'subscribe') {
        metric.subscribed = true
      }
      return stat
    })

    metric.tags = Array.from(tags)

    return metric
  })

  //const result = await resp.json();
  return new Response(JSON.stringify(tagged))
}

