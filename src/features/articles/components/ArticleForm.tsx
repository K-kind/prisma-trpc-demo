import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input } from "antd";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { FormItem } from "react-hook-form-antd";

import {
  ArticleCreateInput,
  ArticleUpdateInput,
} from "@/features/articles/models/article";
import { articleSchema } from "@/features/articles/models/articleSchemas";

type FormValues = ArticleCreateInput;

type Props = {
  type: "create" | "update";
  isLoading: boolean;
  onSubmit: (v: ArticleCreateInput | ArticleUpdateInput) => Promise<void>;
};

export const ArticleForm = ({ type, isLoading, onSubmit }: Props) => {
  // const defaultValues = useMemo(
  //   () => ({
  //     companyName: companyInfo?.companyName ?? "",
  //     yearOfEstablishment: companyInfo?.yearOfEstablishment ?? null,
  //     representativeName: companyInfo?.representativeName ?? "",
  //     companyUrl: companyInfo?.companyUrl ?? "",
  //     isPublic: companyInfo?.isPublic ?? true,
  //   }),
  //   [companyInfo]
  // );

  const schema = useMemo(
    () =>
      articleSchema().pick({
        title: true,
        content: true,
      }),
    [],
  );

  const { control, register, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  // const { antdForm, control, handleSubmit, formState, reset } =
  //   useCustomForm<FormValues>({
  //     defaultValues,
  //     resolver: zodResolver(schema),
  //   });

  // useEffect(() => {
  //   reset(defaultValues);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [defaultValues]);

  // const { notify } = useNotification();
  // const { confirm } = useModal();

  const submit = (values: FormValues) => {
    return onSubmit(values);
  };

  // const onClickCancel = async () => {
  //   if (
  //     formState.isDirty &&
  //     !(await confirm("変更内容は破棄されます。よろしいですか。"))
  //   ) {
  //     return;
  //   }

  //   reset();
  //   notify.info("変更を破棄しました");
  //   onCanceled?.();
  // };

  const onInvalid = () => {
    alert("正しく入力されていない項目があります。");
  };

  return (
    // <Form
    //   form={antdForm}
    //   layout="vertical"
    //   onFinish={handleSubmit(submit, onInvalid)}
    // >
    //   <FormItem control={control} name="companyName" label="企業名もしくは屋号">
    //     <Input placeholder="〇〇株式会社" />
    //   </FormItem>

    //   <Form.Item className={styles["button-wrapper"]}>
    //     {type === "edit" && (
    //       <Button
    //         type="default"
    //         shape="round"
    //         className={styles.button}
    //         loading={isLoading}
    //         onClick={onClickCancel}
    //       >
    //         キャンセル
    //       </Button>
    //     )}
    <Form className="mt-4 max-w-96" onFinish={handleSubmit(submit, onInvalid)}>
      <FormItem control={control} name="title" label="タイトル">
        <Input id="title" />
      </FormItem>

      <FormItem control={control} name="content" label="コンテンツ">
        <Input.TextArea id="content" />
      </FormItem>

      <div>
        <Button
          type="primary"
          shape="round"
          htmlType="submit"
          loading={isLoading}
        >
          保存
        </Button>
      </div>
    </Form>
    // </Form.Item>
    // </Form>
  );
};
