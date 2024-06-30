import { atom } from 'nanostores'

export const $xmtpClient = atom(null);

export const $projectSlug = atom(null);




import supabase from '@/supabase';

export const $projectStampList = atom([]);

export const fetchProjectStamp = async (_projectInfo) => {

    const stamps = await supabase.from("stamps").select("*, contact_books(*)").eq("project_id", _projectInfo.token_address).then(res => res.data)
    console.log('stamps', stamps);
    $projectStampList.set(stamps);

}